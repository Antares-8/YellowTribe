<?php

namespace App\Controller;

use App\Entity\Guest;
use App\Form\InvitationType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfileController extends AbstractController
{
    /**
     * @Route("/profile", name="profile")
     */
    public function index()
    {
        return $this->render('profile/index.html.twig', [
            'title' => 'Mon profil',
        ]);
    }

    /**
     * TODO: template with form to send an invitation to a new member 
     * @Route("/group/invitation", name="send_invitation", methods={"GET"})
     */
    public function sendInvitation(Request $request): Response
    {
        $invitation = new Guest();
        $form = $this->createForm(InvitationType::class, $invitation);
        $form->handleRequest($request); 

        // TODO: condition à l'envoi du form et sa validation
        if ($form->isSubmitted() && $form->isValid()) {
             
            $entityManager = $this->getDoctrine()->getManager(); 
            $entityManager->persist($invitation);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Invitation envoyée'
            );

            return $this->redirectToRoute('profile');
        }

        return $this->render('profile/members.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
