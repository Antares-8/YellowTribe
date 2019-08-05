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