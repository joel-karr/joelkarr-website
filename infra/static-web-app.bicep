@description('Name of the Static Web App')
param name string

@description('Azure region')
param location string

@description('SKU tier')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('Custom domain name. Leave empty to skip.')
param customDomainName string = ''

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: name
  location: location
  sku: {
    name: sku
    tier: sku
  }
  tags: {
    project: 'joelkarr.com'
    managedBy: 'bicep'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
    }
  }
}

resource customDomain 'Microsoft.Web/staticSites/customDomains@2023-12-01' = if (!empty(customDomainName)) {
  parent: staticWebApp
  name: customDomainName
  properties: {
    validationMethod: 'dns-txt-token'
  }
}

output defaultHostname string = staticWebApp.properties.defaultHostname
output id string = staticWebApp.id
output name string = staticWebApp.name
