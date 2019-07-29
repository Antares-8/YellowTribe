<?php
/*
    Controller used to send data for front (calendar)

*/
namespace App\Controller;

use App\Entity\Event;
use App\Form\EventType;
use App\Repository\EventRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\CommentRepository;

class EventController extends AbstractController
{

    /**
     * @Route("/newsfeed", name="newsfeed", methods={"GET","POST"})
     */
    public function indexNewsfeed(EventRepository $eventRepository)
    {
        // TODO: créer une variable $actualités qui récupère toutes les nouveautés (event, comment, picture, member...) d'un groupe selon date d'update 
        // TODO: créer une réquête custom (dans GroupRepository?) qui les récupère et les tri
        // TODO: appeler ce repository dans cette méthode

        $events = $eventRepository->findAllOrderedByUpdatedAtDate();

        $lastEvents = $eventRepository->lastRelease(10);

        return $this->render('event/newsfeed.html.twig', [
            'events' => $events,
            'lastEvents' => $lastEvents,
            'title' => 'Fil d\'actualités',
        ]);
    }

    /**
     * @Route("/calendar", name="calendar", methods={"GET","POST"})
     */
    public function indexCalendar(EventRepository $eventRepository)
    {
        return $this->render('event/index.html.twig', [
            'title' => 'Calendrier',
        ]);
    }

    /**
     * @Route("/event/new", name="event_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($event);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Nouvel événement créé !'
            );
            
            return $this->redirectToRoute('event');
        }

        return $this->render('event/new.html.twig', [
            'event' => $event,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/event/{id}", name="event_show", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function show(Event $event)
    {
        return $this->render('event/show.html.twig', [
            'event' => $event,
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

            return $this->redirectToRoute('event', ['id' => $event->getId()]);
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
