targetScope = 'subscription'

@description('Name of the resource group')
param resourceGroupName string = 'rg-joelkarr-com'

@description('Azure region')
param location string = 'eastus2'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: {
    project: 'joelkarr.com'
    managedBy: 'bicep'
  }
}

output resourceGroupName string = rg.name
