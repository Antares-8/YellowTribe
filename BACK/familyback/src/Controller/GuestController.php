<?php

namespace App\Controller;

use App\Entity\Guest;
use App\Form\InvitationType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GuestController extends AbstractController
{
    // TODO: list of guest? "/tribe/guests" + can add a name with email to personalize invitation ("Bonjour Martine, username vous invite à rejoindre la tribu!")
    // TODO: add properties $name + $message ?

    /** 
     * @Route("/tribe/invitation", name="send_invitation", methods={"GET", "POST"})
     */
    public function sendInvitation(Request $request): Response
    {
        $invitation = new Guest();
        $form = $this->createForm(InvitationType::class, $invitation);
        $form->handleRequest($request); 

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->getUser();
            $tribe = $user->getTribe();
            $invitation->setTribe($tribe);
             
            $entityManager = $this->getDoctrine()->getManager(); 
            $entityManager->persist($invitation);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Invitation envoyée à l\'adresse ' . $invitation->getEmail() 
            );

            return $this->redirectToRoute('profile_index');
        }

        return $this->render('tribe/invite_members.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
