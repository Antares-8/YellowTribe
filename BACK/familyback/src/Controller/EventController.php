<?php
/*
    Controller used to send data for front (calendar)

*/
namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{


    /**
     * @Route("/event", name="event", methods={"GET","POST"})
     */
    public function index(EventRepository $eventRepository)
    {
        $events = $eventRepository->findAll();


        return $this->render('event/index.html.twig', [
            'events' => $events,
            'title' => 'Calendrier',
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
}
