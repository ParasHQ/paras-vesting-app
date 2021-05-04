const Footer = () => {
  return (
    <div className="max-w-3xl m-auto md:flex items-center justify-between pt-32 pb-8">
      <div className="flex items-center justify-center">
        <div className="px-4">
          <a
            href="https://paras.id"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 font-semibold border-b-2 border-transparent hover:border-gray-300"
          >
            Marketplace
          </a>
        </div>
        <div className="px-4">
          <a
            href="https://github.com/ParasHQ/giveaway-app"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 font-semibold border-b-2 border-transparent hover:border-gray-300"
          >
            Github
          </a>
        </div>
        <div className="px-4">
          <a
            // href={`${nearConfig.explorerUrl}/accounts/${nearConfig.contractName}`}
            href="google.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 font-semibold border-b-2 border-transparent hover:border-gray-300"
          >
            Contract
          </a>
        </div>
      </div>
      <div className="px-4 mt-2 md:mt-0 text-center">
        <p className="text-gray-300 font-semibold">© 2021 Paras</p>
      </div>
    </div>
  )
}

export default Footer
