targetScope = 'subscription'

@description('Name of the resource group')
param resourceGroupName string = 'rg-joelkarr-com'

@description('Azure region for all resources')
param location string = 'eastus2'

@description('Name of the Static Web App')
param staticWebAppName string = 'swa-joelkarr-com'

@description('SKU for the Static Web App')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('Custom domain (e.g., joelkarr.com). Leave empty to skip custom domain setup.')
param customDomainName string = ''

// Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: {
    project: 'joelkarr.com'
    managedBy: 'bicep'
  }
}

// Static Web App
module staticWebApp 'static-web-app.bicep' = {
  scope: rg
  name: 'deploy-static-web-app'
  params: {
    name: staticWebAppName
    location: location
    sku: sku
    customDomainName: customDomainName
  }
}

// Outputs
output resourceGroupName string = rg.name
output staticWebAppName string = staticWebApp.outputs.name
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppId string = staticWebApp.outputs.id
