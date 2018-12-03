const renderValueInput = '#renderer-value-input';

export async function renderDocument(page, doc) {
  await page.$eval(renderValueInput, el => {
    el.value = '';
  });
  await page.click(renderValueInput);
  await page.keyboard.type(JSON.stringify(doc));
}

export async function snapshot(page) {
  const renderer = await page.$('#RendererOutput');

  // Try to take a screenshot of only the renderer.
  // Otherwise take the whole page.
  let image;
  if (renderer) {
    image = await renderer.screenshot();
  } else {
    image = await page.screenshot();
  }

  // @ts-ignore
  expect(image).toMatchProdImageSnapshot();
}
