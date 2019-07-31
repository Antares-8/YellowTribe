<?php

namespace App\Serializer\Normalizer;

use App\Entity\Tag;
use App\Entity\User;
use App\Entity\Event;
use App\Entity\Tribe;
use App\Entity\Comment;
use App\Entity\Picture;
use App\Entity\Category;
// use Symfony\Component\Serializer\Exception\CircularReferenceException;
// use Symfony\Component\Serializer\Exception\ExceptionInterface;
// use Symfony\Component\Serializer\Exception\InvalidArgumentException;
// use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class PublicDataNormalizer implements NormalizerInterface {
    /**
     * @var ObjectNormalizer
     */
    private $objectNormalizer;
    public function __construct(ObjectNormalizer $objectNormalizer)
    {
        $this->objectNormalizer = $objectNormalizer;
    }
    public function normalize($object, $format = null, array $context = [])
    {
        $context['ignored_attributes'] = ['user'];
        $data = $this->objectNormalizer->normalize($object, $format, $context);
        return $data;
    }
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Tag || $data instanceof User || $data instanceof Event || $data instanceof Tribe || $data instanceof Comment || $data instanceof Picture || $data instanceof Category;
    }
}