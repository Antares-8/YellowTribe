<?php
/*
    Controller used to send data for front (calendar)

*/
namespace App\Controller;

use App\Entity\Event;
use App\Entity\Tribe;
use App\Form\EventType;
use App\Repository\EventRepository;
use App\Repository\CommentRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
    /**
     * @Route("/calendar", name="calendar", methods={"GET","POST"})
     */
    public function indexCalendar(EventRepository $eventRepository): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();
        //dump($userTribeId);

        // search and find all events binded to user's tribe
        $events = $eventRepository->findAllEventsByTribe($userTribeId);
        $jsonEvents = $this->json($events);

        return $this->render('event/index.html.twig', [
            'title' => 'Calendrier',
            'user' => $connectedUser,
            'tribe' => $userTribeId,
        ]);
    }


    /**
     * @Route("/newsfeed", name="newsfeed", methods={"GET","POST"})
     */
    public function indexNewsfeed(EventRepository $eventRepository, CommentRepository $commentRepository)
    {
        // TODO: créer une variable $news (array) qui récupère toutes les nouveautés (event, comment, picture, member...) d'un groupe selon date d'update 
        // TODO: créer une réquête custom (dans GroupRepository?) qui les récupère et les tri
        // TODO: appeler ce repository dans cette méthode

        // TODO: tri par id ? L'id le plus haut étant le dernier créé, l'ordre peut se faire avec cette donnée

        //$serializer = SerializerBuilder::create()->build();
        $events = $eventRepository->findAllOrderedByUpdatedAtDate();
        //$events = $eventRepository->findAll();
        //$jsonNews = $serializer->serialize($events, 'json');
        //dump($jsonNews);

        $lastEvents = $eventRepository->lastRelease(10);

        $comments = $commentRepository->findAllOrderedByCreatedAtDate();
        //$comments = $commentRepository->findAll();

        $news = [];
        foreach ($events as $event) {
            $news[] = $event;
        }
        
        foreach ($comments as $comment) {
            $news[] = $comment;
        }
        //$jsonNews = $serializer->serialize($news, 'json');
        //dump($jsonNews);
        //$test = array_values($news);

        //$newsAPI = json_encode($events);

        return $this->render('event/newsfeed.html.twig', [
            'events' => $events,
            'lastEvents' => $lastEvents,
            'comments' => $comments,
            'title' => 'Fil d\'actualités',
            //'newsAPI' => $newsAPI,
            'news' => $news,
        ]);
    }

    /**
     * @Route("/event/new", name="event_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($event);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Nouvel événement créé !'
            );
            
            return $this->redirectToRoute('calendar');
        }

        return $this->render('event/new.html.twig', [
            'event' => $event,
            'form' => $form->createView(),
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

    /**
     * @Route("/event/{id}/edit", name="event_edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Event $event): Response
    {
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'info',
                'L\'événement a bien été mis à jour'
            );

            return $this->redirectToRoute('event', ['id' => $event->getId()]);
        }

        return $this->render('event/edit.html.twig', [
            'event' => $event,
            'form' =>$form->createView(),
        ]);
    }

    /**
     * @Route("/event/{id}", name="event_delete", methods={"DELETE"}, requirements={"id"="\d+"})
     */
    public function delete(Request $request, Event $event): Response
    {
        if ($this->isCsrfTokenValid('delete'.$event->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($event);
            $entityManager->flush();

            $this->addFlash(
                'danger',
                'L\'événement a bien été supprimé'
            );
        }

        return $this->redirectToRoute('event');
    }
}
