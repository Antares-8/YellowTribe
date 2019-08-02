<?php

namespace App\Controller\API;

use App\Entity\Event;
use App\Entity\Tribe;
//use JMS\Serializer\SerializerBuilder;
use App\Repository\EventRepository;
use App\Repository\TribeRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

 /**
  * @Route("/api", name="api_")
  */

class EventController extends AbstractController
{

    /**
     * @Route("/events", name="events_list")
     */
    public function list(EventRepository $repository): JsonResponse
    {
        $events = $repository->findAllEventWithUsername();

        return $this->json($events);
    }

    /**
     * @Route("/{tribe}/news", name="news_list")
     */
    public function newsList(EventRepository $eventRepository, Tribe $tribe): JsonResponse
    {
        //dd($tribe);
        //$news = $eventRepository->findAllNews($tribe);
        $events = $eventRepository->findTribeEventsByDate($tribe);

        //dd($events);
        return $this->json($events);
    }

    
}