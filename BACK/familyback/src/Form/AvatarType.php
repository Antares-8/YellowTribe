<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class AvatarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $form = $this->createFormBuilder($avatar, [
            'validation_groups' => ['registration'],
        ])
        // $builder

            ->add('avatar', FileType::class, [
                'label' => 'Photo de profil (jpg,png,gif)',
                'required' => false,
                'data_class' => null
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'validation_groups' => ['registration'],
            'attr' => ['novalidate' => 'novalidate']
        ]);
    }
}
