
/**
 * Test runner utility for organizing and running tests
 */

export interface TestSuite {
  name: string;
  tests: TestCase[];
}

export interface TestCase {
  name: string;
  test: () => Promise<void> | void;
  timeout?: number;
}

export class TestRunner {
  private suites: TestSuite[] = [];

  addSuite(suite: TestSuite) {
    this.suites.push(suite);
  }

  async runAll(): Promise<TestResults> {
    const results: TestResults = {
      totalSuites: this.suites.length,
      totalTests: 0,
      passed: 0,
      failed: 0,
      suiteResults: []
    };

    for (const suite of this.suites) {
      const suiteResult = await this.runSuite(suite);
      results.suiteResults.push(suiteResult);
      results.totalTests += suiteResult.totalTests;
      results.passed += suiteResult.passed;
      results.failed += suiteResult.failed;
    }

    return results;
  }

  private async runSuite(suite: TestSuite): Promise<SuiteResult> {
    const result: SuiteResult = {
      suiteName: suite.name,
      totalTests: suite.tests.length,
      passed: 0,
      failed: 0,
      testResults: []
    };

    for (const test of suite.tests) {
      try {
        const startTime = Date.now();
        await test.test();
        const endTime = Date.now();
        
        result.testResults.push({
          testName: test.name,
          status: 'passed',
          duration: endTime - startTime
        });
        result.passed++;
      } catch (error) {
        result.testResults.push({
          testName: test.name,
          status: 'failed',
          duration: 0,
          error: error instanceof Error ? error.message : String(error)
        });
        result.failed++;
      }
    }

    return result;
  }
}

export interface TestResults {
  totalSuites: number;
  totalTests: number;
  passed: number;
  failed: number;
  suiteResults: SuiteResult[];
}

export interface SuiteResult {
  suiteName: string;
  totalTests: number;
  passed: number;
  failed: number;
  testResults: TestResult[];
}

export interface TestResult {
  testName: string;
  status: 'passed' | 'failed';
  duration: number;
  error?: string;
}
