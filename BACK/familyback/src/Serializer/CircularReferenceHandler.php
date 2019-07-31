<?php
namespace App\Serializer;


use App\Entity\Tag;
use App\Entity\User;
use App\Entity\Event;
use App\Entity\Tribe;
use App\Entity\Comment;
use App\Entity\Picture;
use App\Entity\Category;
use Symfony\Component\Routing\RouterInterface;


class CircularReferenceHandler
{

    /**
     * @TODO : customize entities
     * @var RouterInterface
     */
    private $router;
    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }
    
    public function __invoke($object)
    {
        switch ($object) {
            case $object instanceof Event:
                return $object->getId();
                // 'get_list' = nom de la route où il a la list dont l'id est $object->getId() (chez lui "/api/list/{list})
            case $object instanceof Category:
                return $object->getId();
            case $object instanceof User:
                return $object->getId();
            case $object instanceof Comment:
                return $object->getId();
            case $object instanceof Picture:
                return $object->getId();
            case $object instanceof Tribe:
                return $object->getId();
            case $object instanceof Tag:
                return $object->getId();
        }
        return $object->getId();
    }
}