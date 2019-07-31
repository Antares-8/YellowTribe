<?php

namespace App\Controller\API;

use App\Entity\Event;
use App\Repository\EventRepository;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

 /**
  * @Route("/api", name="api_")
  */

class EventController extends AbstractController
{

    // /**
    //  * @Route("/events", name="events_list")
    //  */
    // public function list(EventRepository $repository)
    // {
    //     $events = $repository->findAll();

    //     return $this->json($events); // Convert the content-type into json instead of HTML
    // }


    /**
     * @Route("/event", name="eventList")
     */
    public function eventList(EventRepository $repository)
    {
        $serializer = SerializerBuilder::create()->build();
        $serializer->serialize($repository, 'json');

        dd($repository);
        return $repository;


        // $data = $serializer->deserialize($inputStr, $typeName, $format);

        // return $this->render('event/index.html.twig', [
        //     'title' => 'Calendrier',
        // ]);

    }
}