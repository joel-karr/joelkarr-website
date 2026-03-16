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

@description('Deploy Azure OpenAI resources for the 404 route assistant')
param deployOpenAi bool = true

@description('Azure OpenAI account name')
param openAiAccountName string = 'aoai-joelkarr-com'

@description('Azure OpenAI deployment name (referenced by the app)')
param openAiDeploymentName string = 'gpt-4o-mini'

@description('Azure OpenAI base model name')
param openAiModelName string = 'gpt-4o-mini'

@description('Azure OpenAI model version')
param openAiModelVersion string = '2024-07-18'

@description('Azure OpenAI deployment capacity in TPM units')
@minValue(1)
param openAiModelCapacity int = 10

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

module openAi 'openai.bicep' = if (deployOpenAi) {
  scope: rg
  name: 'deploy-openai'
  params: {
    accountName: openAiAccountName
    location: location
    modelDeploymentName: openAiDeploymentName
    modelName: openAiModelName
    modelVersion: openAiModelVersion
    modelCapacity: openAiModelCapacity
  }
}

// Outputs
output resourceGroupName string = rg.name
output staticWebAppName string = staticWebApp.outputs.name
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppId string = staticWebApp.outputs.id
output openAiAccountName string = openAi.?outputs.accountName ?? ''
output openAiEndpoint string = openAi.?outputs.endpoint ?? ''
output openAiDeploymentName string = openAi.?outputs.deploymentName ?? ''
