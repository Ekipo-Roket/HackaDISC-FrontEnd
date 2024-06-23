import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'upload-dataset',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  selectedFile: File | null = null;
  successMessage: string = '';

    constructor(private http: HttpClient) {}

    onFileChange(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            this.http.post('http://your-laravel-backend-url/api/import-dataset', formData)
                .subscribe({
                    next: (response: any) => {
                        this.successMessage = response.message;
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
        }
    }
}
