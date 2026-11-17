import { expect, test } from '@playwright/test';

const email = process.env.MOCKATOO_TEST_EMAIL;
const password = process.env.MOCKATOO_TEST_PASSWORD;

test('sign-in goes to the mock GitHub login page', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in with GitHub' }).click();

  await expect(page).toHaveURL(
    /^https:\/\/app\.mockatoo\.globalunderdog\.com\//
  );
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
});

test('signs in with GitHub', async ({ page }) => {
  test.skip(
    !email || !password,
    'Set MOCKATOO_TEST_EMAIL and MOCKATOO_TEST_PASSWORD to run the full sign-in.'
  );

  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in with GitHub' }).click();
  await page.getByLabel('Email', { exact: true }).fill(email!);
  await page.getByLabel('Password', { exact: true }).fill(password!);
  await page.getByRole('button', { name: 'Log in with password' }).click();
  await page.getByRole('button', { name: 'Authorize' }).click();
  await expect(page).toHaveURL('/');

  const session = await (await page.request.get('/api/auth/session')).json();
  expect(session?.user?.email).toBe(email);

  // The products page needs a database, so check the header's GitHub
  // avatar on the customers page.
  await page.goto('/customers');
  await expect(page.getByRole('img', { name: 'Avatar' })).toHaveAttribute(
    'src',
    /app\.mockatoo\.globalunderdog\.com/
  );
});
