const contractMap = [
  {
    accountId: 'team.paras.near',
    contractId: `team.paras-vesting.near`,
  },
  {
    accountId: 'dcp.near',
    contractId: `dcp.paras-vesting.near`,
  },
  {
    accountId: 'neareco.near',
    contractId: `moonwhale.paras-vesting.near`,
  },
  {
    accountId: 'meomeo.near',
    contractId: `gfs.paras-vesting.near`,
  },
  {
    accountId:
      '6a3b825a2c3bf9bd717b841941b8c21c780382b54ddcbf84fba3eb3a8a13b563',
    contractId: `drf.paras-vesting.near`,
  },
  {
    accountId: 'johnh.near',
    contractId: `ybb.paras-vesting.near`,
  },
  {
    accountId:
      '2e774552c3a864cebdffec6f78fa376dc28521c6d33ba707fc4dd64bc27a4332',
    contractId: `gcr.paras-vesting.near`,
  },
  {
    accountId: 'pintualphafund.near',
    contractId: `pintu.paras-vesting.near`,
  },
  {
    accountId: 'psd.near',
    contractId: `d1.paras-vesting.near`,
  },
  {
    accountId: 'bdv.near',
    contractId: `bdv.paras-vesting.near`,
  },
  {
    accountId: 'mandyssee.near',
    contractId: `kernel.paras-vesting.near`,
  },
  {
    accountId: 'kenfintech.near',
    contractId: `infinity.paras-vesting.near`,
  },
  {
    accountId: 'diamond.near',
    contractId: `han.paras-vesting.near`,
  },
  {
    accountId: 'mttlck.near',
    contractId: `matt.paras-vesting.near`,
  },
  {
    accountId: 'maxlev.near',
    contractId: `maxlev.paras-vesting.near`,
  },
  {
    accountId: 'aliaksandrh.near',
    contractId: `aliaksandrh.paras-vesting.near`,
  },
  {
    accountId: 'undefined.near',
    contractId: `undefined.paras-vesting.near`,
  },
  {
    accountId: 'justin_the_sun.near',
    contractId: `justin_the_sun.paras-vesting.near`,
  },
  {
    accountId: 'nbeop.near',
    contractId: `nbeop.paras-vesting.near`,
  },
  {
    accountId: 'awen.near',
    contractId: `awen.paras-vesting.near`,
  },
  {
    accountId: 'community.paras.near',
    contractId: `community.paras-vesting.near`,
  },
  {
    accountId: 'ace23ceo.near',
    contractId: 'ace23ceo.paras-vesting.near',
  },
  {
    accountId: 'actionjackson.near',
    contractId: 'actionjackson.paras-vesting.near',
  },
  {
    accountId: 'ai2490.near',
    contractId: 'ai2490.paras-vesting.near',
  },
  {
    accountId: 'arag.near',
    contractId: 'arag.paras-vesting.near',
  },
  {
    accountId: 'arie-token.near',
    contractId: 'arie-token.paras-vesting.near',
  },
  {
    accountId: 'averagedegen.near',
    contractId: 'averagedegen.paras-vesting.near',
  },
  {
    accountId: 'awdang1805.near',
    contractId: 'awdang1805.paras-vesting.near',
  },
  {
    accountId: 'azuraz.near',
    contractId: 'azuraz.paras-vesting.near',
  },
  {
    accountId: 'bakerbignuts.near',
    contractId: 'bakerbignuts.paras-vesting.near',
  },
  {
    accountId: 'beecatdog.near',
    contractId: 'beecatdog.paras-vesting.near',
  },
  {
    accountId: 'bslin0.near',
    contractId: 'bslin0.paras-vesting.near',
  },
  {
    accountId: 'ck10.near',
    contractId: 'ck10.paras-vesting.near',
  },
  {
    accountId: 'crazynearmonk.near',
    contractId: 'crazynearmonk.paras-vesting.near',
  },
  {
    accountId: 'cryptogoodies.near',
    contractId: 'cryptogoodies.paras-vesting.near',
  },
  {
    accountId: 'davro.near',
    contractId: 'davro.paras-vesting.near',
  },
  {
    accountId: 'dimslim.near',
    contractId: 'dimslim.paras-vesting.near',
  },
  {
    accountId: 'ebtgroup.near',
    contractId: 'ebtgroup.paras-vesting.near',
  },
  {
    accountId: 'emilzed.near',
    contractId: 'emilzed.paras-vesting.near',
  },
  {
    accountId: 'fido.near',
    contractId: 'fido.paras-vesting.near',
  },
  {
    accountId: 'fokusnik.near',
    contractId: 'fokusnik.paras-vesting.near',
  },
  {
    accountId: 'godigital.near',
    contractId: 'godigital.paras-vesting.near',
  },
  {
    accountId: 'hyperfunk.near',
    contractId: 'hyperfunk.paras-vesting.near',
  },
  {
    accountId: 'ihatenear.near',
    contractId: 'ihatenear.paras-vesting.near',
  },
  {
    accountId: 'jaja85.near',
    contractId: 'jaja85.paras-vesting.near',
  },
  {
    accountId: 'kingronay.near',
    contractId: 'kingronay.paras-vesting.near',
  },
  {
    accountId: 'kumar021980.near',
    contractId: 'kumar021980.paras-vesting.near',
  },
  {
    accountId: 'lubbestia.near',
    contractId: 'lubbestia.paras-vesting.near',
  },
  {
    accountId: 'luf.near',
    contractId: 'luf.paras-vesting.near',
  },
  {
    accountId: 'madvillain.near',
    contractId: 'madvillain.paras-vesting.near',
  },
  {
    accountId: 'marcusolp.near',
    contractId: 'marcusolp.paras-vesting.near',
  },
  {
    accountId: 'max10kx.near',
    contractId: 'max10kx.paras-vesting.near',
  },
  {
    accountId: 'maximkhoroshev.near',
    contractId: 'maximkhoroshev.paras-vesting.near',
  },
  {
    accountId: 'mierigais.near',
    contractId: 'mierigais.paras-vesting.near',
  },
  {
    accountId: 'miloudi.near',
    contractId: 'miloudi.paras-vesting.near',
  },
  {
    accountId: 'mirloh.near',
    contractId: 'mirloh.paras-vesting.near',
  },
  {
    accountId: 'mithula.near',
    contractId: 'mithula.paras-vesting.near',
  },
  {
    accountId: 'moonmoney.near',
    contractId: 'moonmoney.paras-vesting.near',
  },
  {
    accountId: 'nrgskill.near',
    contractId: 'nrgskill.paras-vesting.near',
  },
  {
    accountId: 'omac.near',
    contractId: 'omac.paras-vesting.near',
  },
  {
    accountId: 'paimon.near',
    contractId: 'paimon.paras-vesting.near',
  },
  {
    accountId: 'paradox101.near',
    contractId: 'paradox101.paras-vesting.near',
  },
  {
    accountId: 'parasbd.near',
    contractId: 'parasbd.paras-vesting.near',
  },
  {
    accountId: 'riffaza.near',
    contractId: 'riffaza.paras-vesting.near',
  },
  {
    accountId: 'samp24.near',
    contractId: 'samp24.paras-vesting.near',
  },
  {
    accountId: 'sniperz.near',
    contractId: 'sniperz.paras-vesting.near',
  },
  {
    accountId: 'sprintius.near',
    contractId: 'sprintius.paras-vesting.near',
  },
  {
    accountId: 'stmkru.near',
    contractId: 'stmkru.paras-vesting.near',
  },
  {
    accountId: 'teabag.near',
    contractId: 'teabag.paras-vesting.near',
  },
  {
    accountId: 'tetraodon2.near',
    contractId: 'tetraodon2.paras-vesting.near',
  },
  {
    accountId: 'trillion_li.near',
    contractId: 'trillion_li.paras-vesting.near',
  },
  {
    accountId: 'vvinyll.near',
    contractId: 'vvinyll.paras-vesting.near',
  },
  {
    accountId: 'weejockd68.near',
    contractId: 'weejockd68.paras-vesting.near',
  },
  {
    accountId: 'whatever.near',
    contractId: 'whatever.paras-vesting.near',
  },
  {
    accountId: 'wongalex.near',
    contractId: 'wongalex.paras-vesting.near',
  },
  {
    accountId: 'yangu.near',
    contractId: 'yangu.paras-vesting.near',
  },
  {
    accountId: 'yanomi.near',
    contractId: 'yanomi.paras-vesting.near',
  },
  {
    accountId: 'zarzar.near',
    contractId: 'zarzar.paras-vesting.near',
  },
  {
    accountId: 'niftyfund.near',
    contractId: 'niftyfund.paras-vesting.near',
  },
  {
    accountId: 'hungrytechy.near',
    contractId: 'hungrytechy.paras-vesting.near',
  },
  {
    accountId:
      '644152808e5a7d996ab7480814f09148e3eab8a6940cd736d3f8e04499e5269a',
    contractId: 'andrzej.paras-vesting.near',
  },
]

export default contractMap
