<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Form\AvatarType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;



/**
 * @Route("/profile", name="profile_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('profile/index.html.twig', [
            'title' => 'Mon profil',
        ]);
    }

    /**
     * @Route("/edit", name="edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = $this->getUser(); // authenticate User

        $form = $this->createForm(UserType::class, $user);
        $oldPassword = $user->getPassword();
        $form->handleRequest($request);

        $oldAvatar = $user->getAvatar();

        if ($form->isSubmitted() && $form->isValid()) {

            
            if(!is_null($user->getPassword())){

                $encodedPassword = $passwordEncoder->encodePassword(
                    $user, 
                    $user->getPassword() 
               );
               
            } else { 
                $encodedPassword = $oldPassword;
            }

            $user->setPassword($encodedPassword);

            if(is_null($user->getAvatar())){
                $oldAvatar = $user->getAvatar()
;           }

            $user->setAvatar($oldAvatar);

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'Vos informations ont bien été modifiées'
            );

            return $this->redirectToRoute('profile_index');
        }

        return $this->render('profile/edit.html.twig', [
            'title' => 'Modifer mes informations',
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/avatar/edit", name="avatar_edit", methods={"GET", "POST"})
     */
     public function avatarEdit(Request $request): Response
     {
         $user = $this->getUser();
         $form = $this->createForm(AvatarType::class, $user);
         $form->handleRequest($request);

         if ($form->isSubmitted() && $form->isValid()) {

            // Before saving new informations, we have to get the avatar file
            $file = $user->getAvatar();

            if(!is_null($user->getAvatar())){

                // Generating an unique file name (function at the bottom of this file) in order not to crush another file, and concatenating with the extention of the origin file
                $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();

                try {

                    // Moving the file into the right directory (configured in services.yaml)
                    $file->move(
                        $this->getParameter('avatar_directory'),
                        $fileName
                    );
                    // If error, error's dump
                } catch (FileException $e) {
                    dump($e);
                }

                $user->setAvatar($fileName);
            }

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'info',
                'Votre avatar a bien été mis à jour'
            );

            return $this->redirectToRoute('profile_index');
         }

         return $this->render('profile/edit_avatar.html.twig', [
            'title' => 'Modifier mon avatar',
            'form' =>$form->createView()
         ]);
     }

    /**
     * @return string
     */
    private function generateUniqueFileName()
    {
        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());
    }
}

