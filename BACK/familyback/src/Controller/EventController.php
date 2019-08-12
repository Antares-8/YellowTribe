<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Tribe;
use App\Entity\Comment;
use App\Form\EventType;
use App\Form\CommentType;
use App\Form\EventTagType;
use App\Repository\EventRepository;
use App\Repository\CommentRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class EventController extends AbstractController
{
    /**
     * Get events by tribe
     * 
     * @Route("/calendar", name="calendar", methods={"GET","POST"})
     */
    public function indexCalendar(EventRepository $eventRepository): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();
        //dump($userTribeId);

        // redirect new user who doesn't belong to a tribe yet to the new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }

        return $this->render('event/index.html.twig', [
            'title' => 'Calendrier',
            'user' => $connectedUser,
            'tribe' => $userTribeId,
        ]);
    }

    /**
     * Create a new event
     * 
     * @Route("/calendar/event/new", name="event_new", methods={"GET", "POST"})
     */
    public function new(Request $request): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        // redirect user who doesn't belong to a tribe yet to new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }

        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        //dump($request->query->get('date'));
        if (isset($_GET['date'])) {
            dump($_GET['date']);
            // $date = new \DateTime($_GET['date']);

            // $form->get('beginingDate')->setData($date);
        }

        if($form->isSubmitted() && $form->isValid()) {
            $event->setUser($connectedUser);
            $event->setTribe($userTribeId);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($event);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Nouvel événement créé !'
            );
            
            return $this->redirectToRoute('event_show', ['event' => $event->getId()]);
        }

        return $this->render('event/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * show a detailed event
     * 
     * @Route("/calendar/event/{event}", name="event_show", methods={"GET", "POST"})
     */
    public function show(Event $event, Request $request)
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        // redirect new user who doesn't belong to a tribe yet to new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }

        // condition when user try to reach an event which doesn't belong to his tribe
        if ($userTribeId != $event->getTribe()) {

            return $this->render('bundles/TwigBundle/Exception/error404.html.twig'); 
        }

        // possibility to add a comment
        $comment = new Comment();
        $commentForm = $this->createForm(CommentType::class, $comment);
        $commentForm->handleRequest($request);

        if($commentForm->isSubmitted() && $commentForm->isValid()) {
            $comment->setEvent($event);
            $comment->setUser($connectedUser);
            $comment->setTribe($userTribeId);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($comment);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Votre commentaire a bien été enregistré'
            );
            
            return $this->redirect($request->getUri());
        }

        // pass $userTribeId into EventTagType with the options
        $eventTagForm = $this->createForm(EventTagType::class, $event, array(
            'tribe' => $userTribeId,
        ));

        $eventTagForm->handleRequest($request);

        if ($eventTagForm->isSubmitted() && $eventTagForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'Tags ajoutés !'
            );

            return $this->redirectToRoute('event_show', ['event' => $event->getId()]);
        }

        return $this->render('event/show.html.twig', [
            'event' => $event,
            'tribe' => $userTribeId,
            'commentForm' => $commentForm->createView(),
            'tagForm' => $eventTagForm->createView(),
        ]);
    }

    /**
     * Read events by connceted user
     * 
     * @Route("profile/myevents", name="events_list", methods={"GET"})
     */
    public function userEventList(EventRepository $eventRepository)
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        // redirect new user who doesn't belong to a tribe yet to new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }

        $events = $eventRepository->findEventByUser($connectedUser);
        

        return $this->render('event/user_events_list.html.twig', [
            'title' => 'Mes événements créés',
            'events' => $events,
        ]);
    }

    /**
     * Update an event (if you are its creator)
     * 
     * @Route("calendar/event/{event}/edit", name="event_edit", methods={"GET", "POST"}, requirements={"event"="\d+"})
     */
    public function edit(Request $request, Event $event): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        // redirect new user who doesn't belong to a tribe yet to new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }

        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'info',
                'L\'événement a bien été mis à jour'
            );

            return $this->redirectToRoute('event_show', ['event' => $event->getId()]);
        }

        return $this->render('event/edit.html.twig', [
            'event' => $event,
            'form' =>$form->createView(),
        ]);
    }

    // No delete function : we don't want the user to delete an event. Only an admin would do it.
    // @todo : admin part (cf. easyadmin bundle)
}
