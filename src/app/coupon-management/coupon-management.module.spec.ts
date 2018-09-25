import { CouponManagementModule } from './coupon-management.module';

describe('CouponManagementModule', () => {
  let couponManagementModule: CouponManagementModule;

  beforeEach(() => {
    couponManagementModule = new CouponManagementModule();
  });

  it('should create an instance', () => {
    expect(couponManagementModule).toBeTruthy();
  });
});
