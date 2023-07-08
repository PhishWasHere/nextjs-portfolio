
import RepoSchema from '@/models/RepoSchema'

export default async function Seed() {
    try {
      
      const res = await fetch('https://api.github.com/users/PhishWasHere/repos?sort=updated&direction=desc');
      const data = await res.json();
      
      if(res.status === 403) {
        console.log('Rate limit exceeded');
        return 
      }
      
      console.log('DB reset, seeding...');        
      
      for (const repoData of data) {
        const { id, html_url, name, description, image, alt, language, languageColor, updated_at} = repoData;
    
        const existingRepo = await RepoSchema.findOne({ html_url: html_url});
      
        if (existingRepo) {
          existingRepo.repo_id = id;
          existingRepo.html_url = html_url;
          existingRepo.name = name;
          existingRepo.description = description;
          existingRepo.image = image;
          existingRepo.alt = alt;
          existingRepo.primaryLanguage = {
            name: language,
            color: languageColor,
          },
          existingRepo.updated_at = updated_at;
            await existingRepo.save();
          } else {
            const newRepo = new RepoSchema({
              repo_id: id,
              html_url: html_url,
              name: name,
              description: description,
              image: image,
              alt: alt,
              primaryLanguage: {
                name: language,
                color: languageColor,
              },
              updated_at: updated_at
            });
      
            await newRepo.save();
          }
        }
      
      console.log('Seed complete');
    } catch (err) {
        console.log(err);
    }
}
      