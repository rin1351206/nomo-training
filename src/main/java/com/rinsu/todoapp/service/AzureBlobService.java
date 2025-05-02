package com.rinsu.todoapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;

@Service
public class AzureBlobService {

    private final BlobContainerClient containerClient;

    public AzureBlobService(
        @Value("${azure.storage.connection-string}") String connectionString,
        @Value("${azure.storage.container-name}") String containerName) {

        BlobServiceClient serviceClient = new BlobServiceClientBuilder()
            .connectionString(connectionString)
            .buildClient();

        this.containerClient = serviceClient.getBlobContainerClient(containerName);
    }

    public void uploadFile(String blobName, String filePath) {
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.uploadFromFile(filePath, true);
    }

    public void downloadFile(String blobName, String downloadFilePath) {
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.downloadToFile(downloadFilePath, true);
    }
}
