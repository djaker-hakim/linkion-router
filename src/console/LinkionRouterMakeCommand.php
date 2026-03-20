<?php

namespace Linkion\Router\Console;

use Illuminate\Console\Concerns\CreatesMatchingTest;
use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputOption;

/**
 * artisan command that make a new linkion component
 * just like the command make:component
 */
#[AsCommand(name: 'make:linkion-router')]
class LinkionRouterMakeCommand extends GeneratorCommand
{
    use CreatesMatchingTest;

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:linkion-router';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new linkion Router';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'LinkionComponent';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (parent::handle() === false && ! $this->option('force')) {
            return;
        }

        $this->writeView();

    }

    /**
     * Write the view for the linkion component.
     *
     * @return void
     */
    protected function writeView()
    {
        $separator = '/';

        if (windows_os()) {
            $separator = '\\';
        }

        $path = $this->viewPath(
            str_replace('.', $separator, $this->getView()).'.blade.php'
        );

        if (! $this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0777, true, true);
        }

        if ($this->files->exists($path) && ! $this->option('force')) {
            $this->components->error('linkion component already exists.');

            return;
        }

        file_put_contents(
            $path,
            $this->buildView()
        );

        $this->components->info(sprintf('%s [%s] created successfully.', 'View', $path));
    }

    /**
     * Build the class with the given name.
     *
     * @param  string  $name
     * @return string
     */
    protected function buildClass($name)
    {
        
        return str_replace(
            ['DummyView', '{{ view }}'],
            '$this->component(\''.$this->getView().'\')',
            parent::buildClass($name)
        );
    }

    protected function buildView(){
        $stub = $this->files->get($this->getViewStub());
        return $this->replaceClass($stub, $this->qualifyClass($this->getNameInput()));
    }

    protected function getViewStub(){
        return __DIR__. '/Stubs/router-view.stub';
    }

    /**
     * Get the view name relative to the view path.
     *
     * @return string view
     */
    protected function getView()
    {
        $segments = explode('/', str_replace('\\', '/', $this->argument('name')));

        $name = array_pop($segments);

        $path = is_string($this->option('path'))
            ? explode('/', trim($this->option('path'), '/'))
            : [
                'components',
                ...$segments,
            ];

        $path[] = $name;

        return (new Collection($path))
            ->map(fn ($segment) => Str::kebab($segment))
            ->implode('.');
    }

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__. '/Stubs/linkion-router.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\View\Components';
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['path', null, InputOption::VALUE_REQUIRED, 'The location where the component view should be created'],
            ['force', 'f', InputOption::VALUE_NONE, 'Create the class even if the component already exists'],
        ];
    }
}
