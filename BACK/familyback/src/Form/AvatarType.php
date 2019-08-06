<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AvatarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // ->add('firstname')
            // ->add('lastname')
            // ->add('username')
            // ->add('birthDate')
            // ->add('password')
            // ->add('email')
            // ->add('createdAt')
            ->add('avatar', FileType::class, [
                'label' => 'Photo de profil (jpg,png,gif)',
                'required' => false,
                'data_class' => null
            ])
            // ->add('tribe')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
