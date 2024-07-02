<?php

namespace App\Command;

use App\Repository\UrlRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:purge-expired',
    description: 'Add a short description for your command',
)]
class PurgeExpiredCommand extends Command
{
    public function __construct(
        protected readonly UrlRepository $urlRepository
    )
    {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->urlRepository->purgeExpired();
        return Command::SUCCESS;
    }
}
