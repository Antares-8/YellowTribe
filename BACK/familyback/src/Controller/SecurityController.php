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
use App\Repository\GuestRepository;

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
    public function signup(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuestRepository $guestRepository): Response
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

            // find all guest email (is it a secure method?)
            $guestMails = $guestRepository->findAll(); 
            // new user's mail 
            $userMail = $user->getEmail();

            // check if $userMail match with a $guestMail. If it does, setTribe for the new user
            foreach ($guestMails as $checkMail) {
                if ($userMail == $checkMail->getEmail()) {


                    $userTribe = $checkMail->getTribe();
                    
                    $user->setTribe($userTribe); 

                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->persist($user);
                    $entityManager->flush();

                    $this->addFlash(
                        'success',
                        'Bienvenue dans la tribu "' . $user->getTribe() . '"! Vous pouvez vous connecter.'
                    );

                    return $this->redirectToRoute('app_login');

                } 
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Bienvenue chez Yellow Tribe! Vous pouvez vous connecter avec votre email et votre mot de passe'
            );
            
            return $this->redirectToRoute('app_login');
        }

        return $this->render('security/signup.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

}
