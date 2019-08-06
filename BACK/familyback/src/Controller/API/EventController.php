<?php

namespace App\Controller\API;

use App\Entity\Event;
use App\Entity\Tribe;
//use JMS\Serializer\SerializerBuilder;
use App\Repository\UserRepository;
use App\Repository\EventRepository;
use App\Repository\CommentRepository;
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
     * Data API for calendar
     * @Route("/{tribe}/events", name="events_list", methods={"GET", "POST"})
     */
    public function eventsList(EventRepository $repository, Tribe $tribe): JsonResponse
    {
        $events = $repository->findAllEventsByTribe($tribe);

        return $this->json($events);
    }

    /**
     * Data API for newsfeed
     * @Route("/{tribe}/news", name="news_list")
     */
    public function newsList(UserRepository $userRepository, CommentRepository $commentRepository, EventRepository $eventRepository, Tribe $tribe): JsonResponse
    {
        //dd($tribe->getId());
        //$news = $eventRepository->findAllNews($tribe);
        $lastEvents = $eventRepository->findTribeEventsByDate($tribe);
        $lastComments = $commentRepository->findTribeCommentsByDate($tribe);
        $lastUsers = $userRepository->findTribeUsersByDate($tribe);
        
        $news = [];
        foreach ($lastEvents as $event) {
            $event[] = ['type' => 'event'];
            $news[] = $event;
        }

        foreach ($lastComments as $comment) {
            $comment[] = ['type' => 'comment'];
            $news[] = $comment;

        }

        foreach ($lastUsers as $user) {
            $user[] = ['type' => 'user'];
            $news[] = $user;

        }

        //dd($events);
        return $this->json($news);
    }

    
}