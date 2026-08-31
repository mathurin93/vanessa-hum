# Left Handed Ness — React Portfolio Website

A responsive React/Vite website created for Vanessa's art, science and conservation practice.

## Before publishing

Open `src/siteData.js` and replace:

```js
email: 'replace-with-vanessas-email@example.com'
```

with Vanessa's real contact email.

You can also update the Instagram link, location, services and portfolio entries in the same file.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build the site

```bash
npm run build
```

The production files will be generated in `dist/`.

## Publish with GitHub Pages

1. Create a new empty GitHub repository.
2. Upload or push all files in this project to the repository's `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Push a change to `main`, or open the **Actions** tab and run the deployment workflow.

The included `.github/workflows/deploy.yml` file builds and publishes the site automatically.

## Replace portfolio images

Images are stored in:

```text
public/images/
```

To replace an image without changing the code, use the same filename. To add a new project, add the image and update the `projects` array in `src/siteData.js`.

## Main colours

```css
--ink: #272321;
--cocoa: #806b62;
--mocha: #5f4e47;
--cream: #f5f0ea;
--ivory: #fffdf9;
--sage: #7d8c78;
--sage-deep: #4f5e4b;
--sage-light: #e7ece4;
```

## Notes

The supplied Instagram screenshot was used to create temporary portfolio image crops. Replace them with Vanessa's original high-resolution photographs before the final public launch for the best quality.
