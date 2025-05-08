import GithubSvg from "../assets/svg/github.svg?react";

const Appbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Shortsy</h1>

        <div>
          <a
            target="_blank"
            className="text-gray-600 hover:text-black"
            href="https://github.com/pratikpokharel3/url-shortner"
          >
            <GithubSvg fill="currentColor" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
