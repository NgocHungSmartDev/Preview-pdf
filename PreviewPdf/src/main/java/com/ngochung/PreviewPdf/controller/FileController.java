package com.ngochung.PreviewPdf.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class FileController {

    @PostMapping("upload")
    public String uploadFile(@RequestParam MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        Path path = Paths.get("D:\\code practice\\Preview-pdf\\upload\\" + file.getOriginalFilename());
        Files.write(path, bytes);
        return "upload OK";
    }
}
