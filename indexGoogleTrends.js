const readline = require('readline-sync')
const Parser = require('rss-parser');

const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR' 

async function start () {
  const content = {}

  content.searchTerm = await askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()

  async function askAndReturnSearchTerm () {
    const response = readline.question('Digite um termo de pesquisa da Wikipédia ou G para buscar as tendências do google: ')

    return (response.toUpperCase() === 'G') ?  await askAndReturnTrend() : response
       
  }

  async function askAndReturnTrend() {
    console.log('Por favor, espere...')
    const trends = await getGoogleTrends()
    const choice = readline.keyInSelect(trends, 'Escolha sua tendência:')
    
    return trends[choice] 

  }

  async function getGoogleTrends () {
    const parser = new Parser()
    const trends = await parser.parseURL(TREND_URL)
    return trends.items.map(({title}) => title)
  }

  function askAndReturnPrefix () {
    const prefixes = ['Quem é','O que é','A história de']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

  console.log(content)
}

start()