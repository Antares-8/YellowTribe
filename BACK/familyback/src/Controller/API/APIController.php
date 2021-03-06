<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Entity\Event;
use App\Entity\Tribe;
use App\Repository\TagRepository;
use App\Repository\UserRepository;
use App\Repository\EventRepository;
use App\Repository\TribeRepository;
use App\Repository\CommentRepository;
use App\Repository\CategoryRepository;
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

class APIController extends AbstractController
{

    /**
     * Data API to show events by tribe when user is connected 
     * 
     * @Route("/{tribe}/events", name="events_list")
     */
    public function eventsList(EventRepository $repository, Tribe $tribe): JsonResponse
    {
        $events = $repository->findAllEventsByTribe($tribe);

        return $this->json($events);
    }

    /**
     * Data API for newsfeed | search all news (comments, members, events) from the last 10 days 
     * 
     * @Route("/{tribe}/news", name="news_list")
     */
    public function newsList(UserRepository $userRepository, CommentRepository $commentRepository, EventRepository $eventRepository, Tribe $tribe): JsonResponse
    {

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

        return $this->json($news);
    }

 
    /**
     * Data API for tags to add them in calendar and newsfeed views
     * 
     * @Route("/{tribe}/tags", name="tags_list")
     */
    public function tagsList(TagRepository $repository, Tribe $tribe): JsonResponse
    {
        $tags = $repository->findAllTagsByTribe($tribe);

        return $this->json($tags);
    }

    /**
     * Data API for birth dates to add them in calendar
     * 
     * @Route("/{tribe}/birthdays", name="birthdays_list")
     */
    public function birthdaysList(UserRepository $userRepository, Tribe $tribe): JsonResponse
    {
        $birthdays = $userRepository->findUserBirthdayByTribe($tribe);

        return $this->json($birthdays);
    }

    /**
     * Data API for categories to add them in calendar
     * 
     * @Route("/categories", name="categories_list")
     */
    public function categoriesList(CategoryRepository $categoryRepository)
    {
        $categories = $categoryRepository->findCategoryTitle(); 

        return $this->json($categories);
    }


    /**
     * For V2 ! 
     * 
      * Data API connected user with tribe's name

      * @Route("/{tribe}/{user}", name="user_data")
      */
    public function userData(UserRepository $userRepository, User $user, Tribe $tribe)
    {
        $currentUser = $userRepository->findCurrentUser($user);
        // TODO: improve this request
        $currentTribe = $userRepository->findTribebyUser($tribe);

        $userData = [];
        $userData[] = $currentUser;
        $userData[] = $currentTribe;
        
        return $this->json($userData);
    }
}