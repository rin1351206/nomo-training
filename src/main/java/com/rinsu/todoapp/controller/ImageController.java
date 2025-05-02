package com.rinsu.todoapp.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rinsu.todoapp.service.AzureBlobService;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final AzureBlobService azureBlobService;

    @Autowired
    public ImageController(AzureBlobService azureBlobService) {
        this.azureBlobService = azureBlobService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String blobName = UUID.randomUUID().toString() + extension;
            
            Path tempFile = Files.createTempFile("upload-", extension);
            file.transferTo(tempFile.toFile());
            
            azureBlobService.uploadFile(blobName, tempFile.toString());
            
            Files.delete(tempFile);
            
            return ResponseEntity.ok(blobName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("画像のアップロードに失敗しました: " + e.getMessage());
        }
    }

    @GetMapping("/{blobName}")
    public ResponseEntity<String> getImageUrl(@PathVariable String blobName) {
        // 実際のURLを返す（例：Azure Blob StorageのパブリックURL）
        String imageUrl = "https://todoapprinsu.blob.core.windows.net/todo-app/" + blobName;
        return ResponseEntity.ok(imageUrl);
    }
}