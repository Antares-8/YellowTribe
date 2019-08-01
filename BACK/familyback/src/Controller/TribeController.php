<?php

namespace App\Controller;

use App\Entity\Tribe;
use App\Form\TribeType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TribeController extends AbstractController
{
    /**
     * @Route("/tribe", name="tribe")
     */
    public function index()
    {
        return $this->render('tribe/index.html.twig', [
            'controller_name' => 'TribeController',
        ]);
    }

    /**
     * TODO: les utilisateurs qui appartiennent déjà à une tribu ne peuvent pas en créer une nouvelle pour la MVP
     * TODO: rajouter une condition pour vérifier que user a déjà une tribu 
     * @Route("/tribe/new", name="newTribe", methods={"GET","POST"})
     */
    public function newTribe(Request $request): Response
    {
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
