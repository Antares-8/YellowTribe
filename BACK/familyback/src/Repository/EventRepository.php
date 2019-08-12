<?php
namespace App\Repository;
use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
/**
 * @method Event|null find($id, $lockMode = null, $lockVersion = null)
 * @method Event|null findOneBy(array $criteria, array $orderBy = null)
 * @method Event[]    findAll()
 * @method Event[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Event::class);
    }

    /**
     * Function used in EventController to return all events created by the current user ($user)
     *
     * @param [type] $user
     * @return Event[]
     */

    public function findEventByUser($user)
    {
        $qb = $this->createQueryBuilder('e')
            ->join('e.user', 'u') 
            ->addselect('u')
            ->where('e.user = :user')
            ->setParameter('user', $user)
        ;
        return $qb->getQuery()->getArrayResult();
    }

    public function findAllEventsByTribe($tribe)
    {
        $qb = $this->createQueryBuilder('e')
            ->join('e.user', 'u')
            ->addselect('u')
            ->join('e.tribe', 't')
            ->addselect('t')
            ->join('e.category', 'c')
            ->addselect('c')
            ->where('e.tribe = :myTribe')
            ->setParameter('myTribe', $tribe)
        ;
        return $qb->getQuery()->getArrayResult();
    }

    public function findAllEventWithUsername()
    {
        $qb = $this->createQueryBuilder('e')
            ->join('e.user', 'u')
            ->addselect('u.lastname')
            ->addselect('u.firstname')
        ;
        return $qb->getQuery()->getArrayResult();
    }

    // function for newsfeed
    public function findAllNews($tribe)
    {
        $qb = $this->createQueryBuilder('e')
            ->join('e.tribe', 't')
            ->addselect('t')
            ->addselect('u')
            ->from('App\Entity\User', 'u')
            ->where('e.tribe = :myTribe', 'u.tribe = :myTribe')
            ->orderBy('e.createdAt, u.createdAt', 'DESC')
            ->setParameter('myTribe', $tribe);
        
        return $qb->getQuery()->getArrayResult();
    }

    // search events created in the last 10 days
    public function findTribeEventsByDate($tribe) 
    {
        $date = new \DateTime('now'); 
        $date->modify('-10 days');

        $qb = $this->createQueryBuilder('e')
                ->join('e.tribe', 't')
                ->addselect('t')
                ->join('e.user', 'u')
                ->addselect('u')
                ->join('e.category', 'c')
                ->addselect('c')
                ->where('e.tribe = :myTribe')
                ->andWhere('e.createdAt > :date')
                ->setParameters([
                    'myTribe' => $tribe,
                    'date' => $date
                ])
        ;

        return $qb->getQuery()->getArrayResult();
    }

    /**
     * Get Events ordered by updatedAt date
     * 
     *  @return Event[] Returns an array of Event objects
     */
    public function findAllOrderedByUpdatedAtDate()
    {
        $query = $this->createQueryBuilder('e')
                      ->orderBy('e.updatedAt', 'DESC');
        return $query->getQuery()->getResult();
    }

    // Get 10 last results
    public function lastRelease($limit){
        $query = $this->createQueryBuilder('e')
                      ->orderBy('e.id', 'DESC')
                      ->setMaxResults( $limit );
        return $query->getQuery()->getResult();
    }

    
    // /**
    //  * @return Event[] Returns an array of Event objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
    /*
    public function findOneBySomeField($value): ?Event
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}