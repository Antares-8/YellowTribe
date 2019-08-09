<?php

namespace App\Form;

use App\Entity\Tag;
use App\Entity\Event;
use App\Entity\Tribe;
use App\Repository\TagRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventTagType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // $userTribeId from EventController
        $tribe = $options['tribe'];

        $builder
            ->add('tags', EntityType::class, [
                'class' => Tag::class,
                'query_builder' => function (TagRepository $tr) use ( $tribe ) {
                    return $tr->createQueryBuilder('t')
                        ->where('t.tribe = :myTribe')
                        ->setParameter('myTribe', $tribe)
                    ;
                },
                //'choices' => $group->getTags(),
                'choice_label' => 'title',
                'label' => 'Tagger + de membres dans cet événement',
                'expanded' => true,
                'multiple' => true,
                'constraints' => [
                    new Count([
                        'min' => 1,
                        'minMessage' => 'You must select at least {{ limit }} tags',
                    ])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,            
        ]);

        // Define required parameter 'tribe'
        $resolver->setRequired('tribe');
        $resolver->setAllowedTypes('tribe', array(Tribe::class, 'int'));
    }
}
