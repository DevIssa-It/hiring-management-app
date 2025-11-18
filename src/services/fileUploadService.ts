import { supabase } from '@/lib/supabase';

export const fileUploadService = {
  async uploadFile(file: File, bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  },

  async uploadResume(file: File, userId: string): Promise<string> {
    const fileName = `${userId}-${Date.now()}-${file.name}`;
    return this.uploadFile(file, 'resumes', fileName);
  },

  async uploadProfilePicture(file: File, userId: string): Promise<string> {
    const fileName = `${userId}-${Date.now()}-${file.name}`;
    return this.uploadFile(file, 'profile-pictures', fileName);
  },

  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  },

  // Convert base64 to file for webcam captures
  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  },

  async uploadBase64Image(base64: string, userId: string, bucket: string = 'profile-pictures'): Promise<string> {
    const file = this.base64ToFile(base64, `${userId}-webcam-${Date.now()}.jpg`);
    return this.uploadFile(file, bucket, file.name);
  },

  async uploadCompanyLogo(file: File, companyId: string): Promise<string> {
    const fileName = `${companyId}-logo-${Date.now()}-${file.name}`;
    return this.uploadFile(file, 'company-logos', fileName);
  }
};