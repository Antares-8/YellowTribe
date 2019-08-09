<?php

namespace App\Controller;

use App\Entity\Tribe;
use App\Form\TribeType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Tag;
use App\Form\TagType;

class TribeController extends AbstractController
{
    /**
     * List of all members + tags bind to user's tribe
     * 
     * @Route("/tribe", name="tribe", methods={"GET", "POST"})
     */
    public function index(Request $request): Response
    {
        $connectedUser = $this->getUser();
        $userTribeId = $connectedUser->getTribe();

        // redirect new user who doesn't belong to a tribe yet to new tribe tpl 
        if ($userTribeId == null) {

            return $this->redirectToRoute('newTribe');
        }
        
        $tag = new Tag();
        $form = $this->createForm(TagType::class, $tag);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $tag->setTribe($userTribeId);

            $entityManager = $this->getDoctrine()->getManager(); 
            $entityManager->persist($tag);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Le tag '. $tag->getTitle() .' a bien été créé!'
            );

            // redirect to the same page with modification
            return $this->redirect($request->getUri());
        }

        return $this->render('tribe/index.html.twig', [
            'form' => $form->createView(),
            'tribe' => $userTribeId,
        ]);
    }

    /**
     * Create a tribe (a user can only create one tribe)
     * 
     * @Route("/tribe/new", name="newTribe", methods={"GET","POST"})
     */
    public function newTribe(Request $request): Response
    {
        if ($this->getUser()->getTribe() != null) {

            $this->addFlash(
                'success',
                'Impossible de créer une nouvelle tribu. Vous faîtes déjà parti de la tribu des '. $this->getUser()->getTribe() .' !'
            );

            return $this->redirectToRoute('tribe');
        }

        $tribe = new Tribe();
        $form = $this->createForm(TribeType::class, $tribe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user = $this->getUser();

            $user->setTribe($tribe);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($tribe);
            $entityManager->persist($user);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Nouvelle tribu créée !'
            );
            
            return $this->redirectToRoute('profile_index');
        }

        return $this->render('tribe/newTribe.html.twig', [
            'tribe' => $tribe,
            'form' => $form->createView(),
        ]);
    }
}
