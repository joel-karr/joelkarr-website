@description('Azure OpenAI account name')
param accountName string

@description('Azure region for the OpenAI account')
param location string

@description('Azure OpenAI model deployment name used by applications')
param modelDeploymentName string = 'gpt-4o-mini'

@description('Base model name to deploy in Azure OpenAI')
param modelName string = 'gpt-4o-mini'

@description('Model version to deploy')
param modelVersion string = '2024-07-18'

@description('Deployment capacity in tokens-per-minute units')
@minValue(1)
param modelCapacity int = 10

resource openAi 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: accountName
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: accountName
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: false
  }
  tags: {
    project: 'joelkarr.com'
    managedBy: 'bicep'
    workload: 'ai-assistant'
  }
}

resource modelDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAi
  name: modelDeploymentName
  sku: {
    name: 'Standard'
    capacity: modelCapacity
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: modelName
      version: modelVersion
    }
    raiPolicyName: 'Microsoft.Default'
  }
}

output accountName string = openAi.name
output accountId string = openAi.id
output endpoint string = 'https://${openAi.name}.openai.azure.com/'
output deploymentName string = modelDeployment.name
