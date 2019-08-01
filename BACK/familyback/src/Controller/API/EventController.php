<?php

namespace App\Controller\API;

use App\Entity\Event;
use App\Repository\EventRepository;
//use JMS\Serializer\SerializerBuilder;
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
        $events = $repository->findByTitle();

        //dd($events);

        // $normalizers = [
        //     new ObjectNormalizer(),
        // ];

        // $encoders = [
        //     new JsonEncoder(),
        // ];

        // $serializer = new Serializer($normalizers, $encoders);

        // $serializedData = $serializer->serialize($events, 'json', [
        //     ObjectNormalizer::SKIP_NULL_VALUES => true,
        // ]);

        // dd($serializedData);

        // return $this->json($events, Response::HTTP_OK, [], [
        //     ObjectNormalizer::SKIP_NULL_VALUES => true,
        // ]); // Convert the content-type into json instead of HTML

        return new JsonResponse($events);
    }


    // /**
    //  * @Route("/event", name="eventList")
    //  */
    // public function eventList(EventRepository $repository)
    // {
    //     $serializer = SerializerBuilder::create()->build();
    //     $serializer->serialize($repository, 'json');

    //     dd($repository);
    //     return $repository;


        // $data = $serializer->deserialize($inputStr, $typeName, $format);

        // return $this->render('event/index.html.twig', [
        //     'title' => 'Calendrier',
        // ]);

    
}