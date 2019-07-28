<?php

namespace App\Controller\API;

use App\Repository\EventRepository;
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

        return $this->json($events); // Convert the content-type into json instead of HTML
    }
}