<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

 /**
  * @Route("/api", name="api_")
  */

class EventController extends AbstractController
{

    /**
     * @Route("/events", name="events_list")
     */
    public function list(EventRepository $repository)
    {
        $events = $repository->findAll();

        return $this->json($events); // Convertit le content-type en json et pas en HTML
    }
}