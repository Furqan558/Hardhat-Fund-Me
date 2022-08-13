//imports

// function deployFunc() {
//     console.log("HI!")
// }

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
// module.exports.default = deployFunc
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //when going for localhost or working with hardhat we use mocking
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put price feed address
        log: true,
    })
    log("------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
