import { useState, type FormEvent } from "react";

import { axios } from "./api/axios";

import Logo1Svg from "./assets/svg/logo1.svg?react";
import Logo2Svg from "./assets/svg/logo2.svg?react";
import ContentCopySvg from "./assets/svg/content-copy.svg?react";

import Appbar from "./components/Appbar";
import InputText from "./components/InputText";
import Button from "./components/Button";

function App() {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isUrlShortened, setIsUrlShortened] = useState(false);
  const [shortenUrl, setShortenUrl] = useState("");
  const [serverError, setServerError] = useState<string | null>("");
  const [isUrlLinkCopied, setIsUrlLinkCopied] = useState(false);

  async function generateURL(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (url === "") {
        setValidationError("URL is required.");
        return;
      }

      setValidationError("");
      setServerError(null);
      setIsUrlShortened(false);

      setBtnLoading(true);

      const resp = await axios.post("/", {
        url: url.trim()
      });

      setShortenUrl(resp.data.short_url);
      setIsUrlShortened(true);
    } catch (err) {
      console.error(e);
      setServerError("The url address you entered is invalid. Check again!");
    } finally {
      setBtnLoading(false);
    }
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(shortenUrl);

      setIsUrlLinkCopied(true);

      setTimeout(() => {
        setIsUrlLinkCopied(false);
      }, 2000);
    } catch (err) {
      setServerError("Fail to copy url.");
    }
  }

  return (
    <>
      <Appbar />

      {isUrlLinkCopied && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded bg-blue-200 px-5 py-3">
          URL linked copied.
        </div>
      )}

      <main className="container mx-auto w-10/12 grow py-12 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="flex justify-center">
          <Logo1Svg />
          <Logo2Svg />
        </div>

        <h2 className="mt-3 text-center text-xl font-medium">
          Paste a link to shorten it.
        </h2>

        {serverError && (
          <div className="mt-3 rounded bg-red-200 px-5 py-3 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={generateURL}>
          <div className="mt-7">
            <InputText
              placeholder="Enter url"
              error={validationError}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="mt-5 flex justify-center">
            <Button type="submit" className="w-40" loading={btnLoading}>
              Generate Link
            </Button>
          </div>
        </form>

        {isUrlShortened && (
          <div className="relative mt-8 rounded bg-blue-200 px-5 py-10 text-center">
            <div className="mb-1">Shorten Url:</div>

            <a
              target="_blank"
              href={shortenUrl}
              className="font-medium underline"
            >
              {shortenUrl}
            </a>

            <div
              className="absolute top-2 right-2 rounded p-1 hover:bg-blue-300"
              onClick={handleCopyUrl}
            >
              <ContentCopySvg />
            </div>
          </div>
        )}
      </main>

      <footer>
        <div className="mb-2 text-center text-sm text-gray-700">
          Powered by{" "}
          <a
            target="_blank"
            href="https://spoo.me/api"
            className="font-medium underline"
          >
            Spoo.me
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
