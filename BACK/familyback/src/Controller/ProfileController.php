<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

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
    public function sendInvitation()
    {
        
    }
}
