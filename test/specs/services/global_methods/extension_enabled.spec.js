import GlobalMethods from '@/services/global_methods';

it('should return true if env variable etensionEnabled is "true"', () => {
  process.env.extensionEnabled = 'true';
  expect(GlobalMethods.extensionEnabled()).to.be.true
  delete process.env.extensionEnabled
})

it('should return false if env variable etensionEnabled is other cases', () => {
  process.env.extensionEnabled = 'false';
  expect(GlobalMethods.extensionEnabled()).to.be.false
  delete process.env.extensionEnabled
})
