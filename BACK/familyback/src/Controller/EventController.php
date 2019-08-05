<?php
/*
    Controller used to send data for front (calendar)

*/
namespace App\Controller;

use App\Entity\Event;
use App\Entity\Tribe;
use App\Entity\Comment;
use App\Form\EventType;
use App\Form\CommentType;
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
     * @Route("/calendar", name="calendar", methods={"GET","POST"})
     */
    public function indexCalendar(EventRepository $eventRepository): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();
        //dump($userTribeId);

        // search and find all events binded to user's tribe
        $events = $eventRepository->findAllEventsByTribe($userTribeId);
        $jsonEvents = $this->json($events);

        return $this->render('event/index.html.twig', [
            'title' => 'Calendrier',
            'user' => $connectedUser,
            'tribe' => $userTribeId,
        ]);
    }

    /**
     * @Route("/calendar/new", name="event_new", methods={"GET", "POST"})
     */
    public function new(Request $request): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

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
            
            return $this->redirectToRoute('calendar');
        }

        return $this->render('event/new.html.twig', [
            //'event' => $event,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/calendar/{event}", name="event_show", methods={"GET", "POST"})
     */
    public function show(Event $event, Request $request)
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
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

        return $this->render('event/show.html.twig', [
            'event' => $event,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("profile/myevents", name="events_list", methods={"GET"})
     */
    public function userEventList(EventRepository $eventRepository)
    {
        $connectedUser = $this->getUser();
        $events = $eventRepository->findEventByUser($connectedUser);
        

        return $this->render('event/user_events_list.html.twig', [
            'title' => 'Mes événements créés',
            'events' => $events,
        ]);
    }

    /**
     * @Route("/event/{id}/edit", name="event_edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Event $event): Response
    {
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'info',
                'L\'événement a bien été mis à jour'
            );

            return $this->redirectToRoute('calendar', ['id' => $event->getId()]);
        }

        return $this->render('event/edit.html.twig', [
            'event' => $event,
            'form' =>$form->createView(),
        ]);
    }

    /**
     * @Route("/event/{id}", name="event_delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(Request $request, Event $event): Response
    {
        if ($this->isCsrfTokenValid('delete'.$event->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($event);
            $entityManager->flush();

            $this->addFlash(
                'danger',
                'L\'événement a bien été supprimé'
            );
        }

        return $this->redirectToRoute('event');
    }
}
