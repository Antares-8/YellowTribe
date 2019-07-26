<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //    $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/signup", name="app_signup", methods={"GET", "POST"})
     */
    public function signup(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $encodedPassword = $passwordEncoder->encodePassword(
                 $user, 
                 $user->getPassword() 
            );

            $user->setPassword($encodedPassword);

            // TODO: si l'utilisateur qui s'inscrit a reçu une invitation (càd $user->getEmail == un mail dans Guest), alors il appartient au groupe de l'invitation et est bien redirigé vers sa page de profil
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            
            
            // TODO: si l'email ne match avec aucun Guest, redirection vers Création d'un groupe 'newTribe' 
            return $this->redirectToRoute('newTribe');
        }

        return $this->render('security/signup.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

}
