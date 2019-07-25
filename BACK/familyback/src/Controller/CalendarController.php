<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\EventRepository;

class CalendarController extends AbstractController
{
    /**
     * @Route("/calendar", name="calendar")
     */
    public function index(EventRepository $eventRepository)
    {
        $events = $eventRepository->findAll();


        return $this->render('calendar/index.html.twig', [
            'events' => $events,
            'title' => 'Calendrier',
        ]);
    }
}
