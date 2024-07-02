<?php

namespace App\Controller;

use App\Entity\Url;
use App\Repository\UrlRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    public function __construct(
        protected readonly UrlRepository $urlRepository
    ) {

    }
    #[Route('/{hash}', name: 'app_main')]
    public function index(?string $hash = null): Response
    {;
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    #[Route('/api', name: 'app_api', methods: ['POST'])]
    public function api(Request $request): Response
    {
        $data = $request->getPayload()->all();

        $url = new Url();
        $url
            ->setHash(bin2hex(random_bytes(10)))
            ->setUrl($data['url']);

        if($data['isLimited']) {
            $url->setRemainingClicks(intval($data['limited']));
        }



        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
}
